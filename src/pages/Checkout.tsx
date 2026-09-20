import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Checkout() {
  const { cartItems, updateQuantity, removeFromCart, totalAmount } = useCart();
  const { toast } = useToast();

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasSeparateBilling, setHasSeparateBilling] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<string | null>(null);

  // Dettagli Cliente e Spedizione
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'Italy',
  });

  // Dettagli Fatturazione (se separata)
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Italy',
  });

  // Validazione dinamica dei campi di fatturazione
  const isBillingValid = !hasSeparateBilling || (
    !!billingDetails.firstName.trim() &&
    !!billingDetails.lastName.trim() &&
    !!billingDetails.address.trim() &&
    !!billingDetails.city.trim() &&
    !!billingDetails.postalCode.trim() &&
    !!billingDetails.country.trim()
  );

  // Validazione globale del modulo
  const isFormValid =
    cartItems.length > 0 &&
    !!customerDetails.email.trim() &&
    !!customerDetails.firstName.trim() &&
    !!customerDetails.lastName.trim() &&
    !!shippingAddress.address.trim() &&
    !!shippingAddress.city.trim() &&
    !!shippingAddress.postalCode.trim() &&
    !!shippingAddress.country.trim() &&
    isBillingValid;

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) return;
    setAppliedDiscount(discountCode.trim());
    toast({
      title: "Codice applicato",
      description: `Il codice promozionale ${discountCode} verrà elaborato al pagamento.`,
    });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast({
        variant: "destructive",
        title: "Campi incompleti",
        description: "Compila tutti i campi obbligatori per proseguire.",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const datiSpedizioneCompleti = {
        cliente: customerDetails,
        spedizione: shippingAddress,
        fatturazione: hasSeparateBilling ? billingDetails : shippingAddress,
      };

      // Helper per estrarre la misura personalizzata dall'item indipendentemente dal nome proprietà nel cartContext
      const getCustomSize = (item: any) => 
        item.misura_personalizzata || item.customSize || item.misurePersonalizzate || item.misure || null;

      // 1. Creazione del record dell'ordine su Supabase
      const { data: ordine, error: dbError } = await supabase
        .from('Ordini')
        .insert([
          {
            totale: totalAmount,
            stato: 'pending',
            email: customerDetails.email,
            nome: customerDetails.firstName,
            cognome: customerDetails.lastName,
            telefono: customerDetails.phone,
            articoli: cartItems.map((item) => ({
              sku: item.sku || item.id,
              nome: item.name,
              prezzo: item.price,
              quantita: item.quantity,
              categoria: item.category || item.categoria || null,
              misura_personalizzata: getCustomSize(item),
            })),
            indirizzo_spedizione: datiSpedizioneCompleti,
            codice_sconto: appliedDiscount,
          },
        ])
        .select()
        .single();

      if (dbError || !ordine) {
        throw new Error(dbError?.message || "Impossibile salvare l'ordine.");
      }

      // 2. Chiamata alla Edge Function per la sessione Stripe
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'create-checkout-session',
        {
          body: {
            order_id: ordine.id,
            email: customerDetails.email,
            discount_code: appliedDiscount,
            items: cartItems.map((item) => ({
              nome: item.name,
              price: item.price,
              quantity: item.quantity || 1,
              misura_personalizzata: getCustomSize(item),
            })),
          },
        }
      );

      if (functionError) {
        throw new Error(functionError.message || "Errore nella creazione della sessione di pagamento.");
      }

      // Reindirizzamento a Stripe Checkout
      if (functionData?.url) {
        window.location.href = functionData.url;
      } else {
        throw new Error("URL di reindirizzamento Stripe non valido.");
      }
    } catch (err: any) {
      console.error("Errore durante il checkout:", err);
      toast({
        variant: "destructive",
        title: "Errore durante il pagamento",
        description: err.message || "Si è verificato un problema, riprova più tardi.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* SEZIONE FORM DETTAGLI E SPEDIZIONE */}
      <div className="lg:col-span-7 space-y-6">
        <form onSubmit={handleCheckout} className="space-y-6">
          {/* Dati Cliente */}
          <div className="p-6 border rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Dettagli del Cliente</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Nome *"
                value={customerDetails.firstName}
                onChange={(e) => setCustomerDetails({ ...customerDetails, firstName: e.target.value })}
                required
              />
              <Input
                placeholder="Cognome *"
                value={customerDetails.lastName}
                onChange={(e) => setCustomerDetails({ ...customerDetails, lastName: e.target.value })}
                required
              />
            </div>
            <Input
              type="email"
              placeholder="Email *"
              value={customerDetails.email}
              onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
              required
            />
            <Input
              type="tel"
              placeholder="Telefono"
              value={customerDetails.phone}
              onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
            />
          </div>

          {/* Indirizzo Spedizione */}
          <div className="p-6 border rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Indirizzo di Spedizione</h2>
            <Input
              placeholder="Indirizzo e Numero Civico *"
              value={shippingAddress.address}
              onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                placeholder="Città *"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                required
              />
              <Input
                placeholder="CAP *"
                value={shippingAddress.postalCode}
                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                required
              />
              <Input
                placeholder="Paese *"
                value={shippingAddress.country}
                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Indirizzo Fatturazione Separato */}
          <div className="p-6 border rounded-lg space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="separateBilling"
                checked={hasSeparateBilling}
                onCheckedChange={(checked) => setHasSeparateBilling(!!checked)}
              />
              <label htmlFor="separateBilling" className="text-sm font-medium leading-none cursor-pointer">
                Utilizza un indirizzo di fatturazione diverso
              </label>
            </div>

            {hasSeparateBilling && (
              <div className="pt-4 space-y-4 border-t">
                <h3 className="text-lg font-medium">Indirizzo di Fatturazione</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nome *"
                    value={billingDetails.firstName}
                    onChange={(e) => setBillingDetails({ ...billingDetails, firstName: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Cognome *"
                    value={billingDetails.lastName}
                    onChange={(e) => setBillingDetails({ ...billingDetails, lastName: e.target.value })}
                    required
                  />
                </div>
                <Input
                  placeholder="Indirizzo Fatturazione *"
                  value={billingDetails.address}
                  onChange={(e) => setBillingDetails({ ...billingDetails, address: e.target.value })}
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    placeholder="Città *"
                    value={billingDetails.city}
                    onChange={(e) => setBillingDetails({ ...billingDetails, city: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="CAP *"
                    value={billingDetails.postalCode}
                    onChange={(e) => setBillingDetails({ ...billingDetails, postalCode: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Paese *"
                    value={billingDetails.country}
                    onChange={(e) => setBillingDetails({ ...billingDetails, country: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Reindirizzamento a Stripe...
              </>
            ) : (
              `Procedi al Pagamento • €${totalAmount.toFixed(2)}`
            )}
          </Button>
        </form>
      </div>

      {/* SEZIONE RIEPILOGO CARRELLO */}
      <div className="lg:col-span-5 border rounded-lg p-6 h-fit space-y-6 bg-slate-50">
        <h2 className="text-xl font-semibold border-b pb-4">Riepilogo Ordine</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-6">Il carrello è vuoto.</p>
        ) : (
          <div className="space-y-4 divide-y">
            {cartItems.map((item) => {
              const itemSize = item.customSize || item.misurePersonalizzate || item.misura_personalizzata || item.misure;
              return (
                <div key={item.id} className="pt-4 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    {itemSize && (
                      <p className="text-xs text-gray-500">
                        Misura: {itemSize}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      €{item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 h-8 text-center"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Codice Promozionale */}
        <div className="pt-4 border-t space-y-2">
          <label className="text-sm font-medium">Codice Promo / Voucher</label>
          <div className="flex gap-2">
            <Input
              placeholder="Inserisci codice"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <Button type="button" variant="outline" onClick={handleApplyDiscount}>
              Applica
            </Button>
          </div>
        </div>

        {/* Totali */}
        <div className="pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span>Spedizione</span>
            <span className="font-medium">Gratuita</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Totale</span>
            <span>€{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
