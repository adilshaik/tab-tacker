import Head from "next/head";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const signin = () => {
  return (
    <>
      <div className='h-screen flex'>
        <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full max-w-sm lg:w-96'>
            <div>
              <img
                className='h-12 w-auto'
                src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                alt='Workflow'
              />
              <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
                Sign in to your account
              </h2>
            </div>

            <div className='mt-8'>
              <div className='flex flex-col'>
                <div className='my-2'>
                  <button
                    onClick={() =>
                      signIn("google", {
                        callbackUrl: process.env.CALLBACK_URL,
                      })
                    }
                    className='w-full inline-flex justify-center py-1 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                  >
                    <span className='sr-only'>Sign in with Google</span>
                    <FcGoogle size={28} />
                  </button>
                </div>

                <div className='my-2'>
                  <button
                    onClick={() =>
                      signIn("github", {
                        callbackUrl: process.env.CALLBACK_URL,
                      })
                    }
                    className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-500 hover:bg-gray-900'
                  >
                    <span className='sr-only'>Sign in with GitHub</span>
                    <BsGithub size={22} color={"white"} />
                  </button>
                </div>

                <div className='my-2'>
                  <button
                    onClick={() =>
                      signIn("facebook", {
                        callbackUrl: process.env.CALLBACK_URL,
                      })
                    }
                    className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-blue-600 text-sm font-medium text-gray-500 hover:bg-blue-700'
                  >
                    <span className='sr-only'>Sign in with Facebook</span>
                    <BsFacebook size={22} color='white' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden lg:block relative w-0 flex-1'>
          <img
            className='absolute inset-0 h-full w-full object-cover'
            src='https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
            alt=''
          />
        </div>
      </div>
    </>
  );
};

export default signin;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
