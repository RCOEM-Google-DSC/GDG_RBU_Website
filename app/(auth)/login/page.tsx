import { LoginForm } from '@/app/Components/Auth/LoginForm'

const LoginPage = () => {
  return (
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
  )
}

export default LoginPage