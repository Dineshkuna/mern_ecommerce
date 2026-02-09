import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../components/PageTitle'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeErrors, removeSuccess, resetPassword } from '../features/user/userSlice'
import { toast } from 'react-toastify'

function ResetPassword() {

  const { success, loading, error } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useParams()

  const [newPassword, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("")

  const resetPasswordSubmit = (e) => {
    e.preventDefault()

    dispatch(resetPassword({
      token,
      userData: {
        password: newPassword,
        confirmPassword
      }
    }))
  }

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center' })
      dispatch(removeErrors())
    }
  }, [error, dispatch])

  useEffect(() => {
    if (success) {
      toast.success("Password Reset Successful", {
        position: 'top-center'
      })

      dispatch(removeSuccess())

      setTimeout(() => {
        navigate('/login')
      }, 1200)
    }
  }, [success, dispatch, navigate])

  return (
    <>
      <PageTitle title="Reset Password" />

      <div className="container form-container">
        <div className="form-content">
          <form className="form" onSubmit={resetPasswordSubmit}>
            <h2>Reset Password</h2>

            <div className="input-group">
              <input
                type="password"
                placeholder='Enter new password'
                value={newPassword}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button disabled={loading} className="authBtn">
              {loading ? "Resetting..." : "Reset Password"}
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
