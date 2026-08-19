import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { submitPromotionRequest } from "@/lib/youtube.functions";

const PROMOTION_TYPES = [
  "YouTube Video",
  "YouTube Short",
  "Website Promotion",
  "Business Feature",
  "Product Review",
  "Sponsored Content",
  "Other",
];

const CONTACT_METHODS = ["Email", "Phone", "WhatsApp", "Telegram"];

const field =
  "h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-colors duration-200 focus:border-primary";
const area =
  "min-h-28 w-full rounded-xl border border-input bg-background p-4 text-sm outline-none transition-colors duration-200 focus:border-primary";
const label = "micro-label mb-2 block text-muted-foreground";

export function PromotionForm({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const submit = useServerFn(submitPromotionRequest);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const value = (k: string) => String(f.get(k) ?? "").trim();
    try {
      await submit({
        data: {
          business_name: value("business_name"),
          contact_person: value("contact_person"),
          email: value("email"),
          phone: value("phone"),
          product_or_service: value("product_or_service"),
          promotion_type: value("promotion_type"),
          campaign_description: value("campaign_description"),
          link: value("link"),
          preferred_contact: value("preferred_contact"),
          additional_info: value("additional_info"),
        },
      });
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error && /Missing required|Invalid email/.test(err.message)
          ? err.message
          : "We couldn't submit your request right now. Please try again or contact Saris TV directly.",
      );
    } finally {
      setBusy(false);
    }
  };

  const close = (v: boolean) => {
    onOpenChange(v);
    if (!v) setTimeout(() => setDone(false), 250);
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        {done ? (
          <div className="flex flex-col items-center gap-5 py-10 text-center">
            <CheckCircle2 size={44} className="text-primary" />
            <DialogTitle className="font-display text-2xl">Request received</DialogTitle>
            <DialogDescription className="max-w-md text-base">
              Thank you for contacting Saris TV. Your promotion request has been received and our
              team will review it and contact you shortly.
            </DialogDescription>
            <button
              type="button"
              onClick={() => close(false)}
              className="font-display mt-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Request a Promotion</DialogTitle>
              <DialogDescription>
                Tell us about your business and how you would like Saris TV to promote it.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="mt-4 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="business_name">Business / Brand Name</label>
                <input id="business_name" name="business_name" required maxLength={120} className={field} />
              </div>
              <div>
                <label className={label} htmlFor="contact_person">Contact Person</label>
                <input id="contact_person" name="contact_person" required maxLength={120} className={field} />
              </div>
              <div>
                <label className={label} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required maxLength={200} className={field} />
              </div>
              <div>
                <label className={label} htmlFor="phone">Phone Number</label>
                <input id="phone" name="phone" required maxLength={40} className={field} />
              </div>
              <div>
                <label className={label} htmlFor="product_or_service">Product or Service</label>
                <input id="product_or_service" name="product_or_service" required maxLength={200} className={field} />
              </div>
              <div>
                <label className={label} htmlFor="promotion_type">Promotion Type</label>
                <select id="promotion_type" name="promotion_type" required defaultValue="" className={field}>
                  <option value="" disabled>Select a type</option>
                  {PROMOTION_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="campaign_description">Campaign Description</label>
                <textarea id="campaign_description" name="campaign_description" required maxLength={2000} className={area} />
              </div>
              <div>
                <label className={label} htmlFor="link">Website / Social Media Link</label>
                <input id="link" name="link" maxLength={300} className={field} placeholder="https://" />
              </div>
              <div>
                <label className={label} htmlFor="preferred_contact">Preferred Contact Method</label>
                <select id="preferred_contact" name="preferred_contact" defaultValue="Email" className={field}>
                  {CONTACT_METHODS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="additional_info">Additional Information</label>
                <textarea id="additional_info" name="additional_info" maxLength={2000} className={area} />
              </div>

              {error ? (
                <p className="sm:col-span-2 text-sm text-destructive">{error}</p>
              ) : null}

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={busy}
                  className="font-display inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.01] disabled:opacity-70"
                >
                  {busy ? <Loader2 size={16} className="animate-spin" /> : null}
                  Submit Promotion Request
                </button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
