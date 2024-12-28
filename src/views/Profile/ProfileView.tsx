import { useAuth } from "@/hooks/useAuth"
import Loading from "../Loading"
import ProfileForm from "@/components/Profile/ProfileForm"

const ProfileView = () => {

  const { data, isLoading } = useAuth()

  if (isLoading) return <Loading />
  if (data) return <ProfileForm data={data} />
}

export default ProfileView