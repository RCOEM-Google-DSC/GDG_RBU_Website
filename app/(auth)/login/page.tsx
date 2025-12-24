import { LoginForm } from '@/app/Components/Auth/LoginForm'
import Footer from '@/app/Components/Landing/Footer'

const LoginPage = () => {
  return (
    <div>

      <div className="grid grid-cols-2 min-h-screen w-full p-10">
        {/* Left Panel - Form */}
        <div className=''>
          <LoginForm />
        </div>

        {/* Right Panel - Branding */}
        <div>
          {/* Add branding content here if needed */}
        </div>
      </div>
      {/* footer */}
      <section className='mt-20'>
        <Footer />
      </section>
    </div>
  )
}

export default LoginPage