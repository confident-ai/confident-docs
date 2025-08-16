import Memberships from '@/components/pricing/memberships/memberships'
import GlobalLayout from '../global-layout'

export const metadata = {
  title: "Pricing that scales with your needs",
  description: "Flexible pricing starting from $0/month.",  
  metadataBase: 'https://confident-ai.com', 
  openGraph: {
    title: "Pricing that scales with your needs",
    description: "Flexible pricing starting from $0/month.",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pricing that scales with your needs",
    description: "Flexible pricing starting from $0/month.",
  },
};
export default function HomePage() {
  return (
    <>

      <GlobalLayout staticHeader={true}>
        <Memberships/>
      </GlobalLayout>
    </>
  )
}



