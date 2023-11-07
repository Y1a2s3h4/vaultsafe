import { headers } from 'next/headers';
import PageContainer from "./PageContainer";
export default async function DefaultPage({params}:{params:{name:string}}) {
  const headersList = headers();
  const fullUrl = headersList.get('x-url') || "";
  const res = await fetch(`${fullUrl.slice(0, -params.name.length)}api/${params.name}`)
  const data = await res.json()
  return (
    <>
      <PageContainer params={params} TabsData={data}/>
    </>
  );
}