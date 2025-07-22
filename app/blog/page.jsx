import Blogs from '@/components/Blog/Blogs'
import GlobalLayout from '@/app/global-layout'
import { getBlogs } from '@/functions/get-blogs'

export const metadata = {
  title: '',
  description: '',
};
export default async function Page() {
  return (
    <>
      <GlobalLayout >
        <Blogs />
      </GlobalLayout>
    </>
  )
}


