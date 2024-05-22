import Link from "next/link";
import { WoofForm } from "../../components/WoofForm";

export default function NewPage() {
  return (
    <div>
      New <Link href="/">Back</Link>
      <div className="rounded-xl bg-slate-50 p-4">
        <WoofForm
          marker={{
            lat: 0,
            lng: 0,
          }}
        />
      </div>
    </div>
  );
}
