import dynamic from "next/dynamic";

const ClientOnly = dynamic(() => import("@uidotdev/usehooks"), {
  ssr: false,
});

export default ClientOnly;
