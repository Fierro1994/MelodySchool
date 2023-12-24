import { useSelector } from 'react-redux'
import { accessTokenLoad } from "../slices/authSlice"

const useAuth = () => {
    const token = useSelector(accessTokenLoad)
}
export default useAuth