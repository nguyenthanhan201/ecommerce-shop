import DefaultLayout from "@/layouts/default-layout/DefaultLayout";
import Link from "next/link";

function Page404() {
  return (
    <DefaultLayout>
      <div className="min-h-full bg-white px-4 py-16 lg:px-8 md:grid md:place-items-center sm:px-6 sm:py-24">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              404
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Không tìm thấy trang
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Hãy kiểm tra địa chỉ URL và thử lại.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link href="/">
                  <p className="inline-flex items-center rounded-md  border-transparent  bg-gradient-to-br from-pink-400 to-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gradient-to-br hover:from-pink-600 hover:to-cyan-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                    Về trang chủ
                  </p>
                </Link>
                {/* <Link href="/support">
                    <a className="inline-flex items-center rounded-md border border-transparent bg-pink-100 px-4 py-2 text-sm font-medium text-black hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                      Contact support
                    </a>
                  </Link> */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Page404;
