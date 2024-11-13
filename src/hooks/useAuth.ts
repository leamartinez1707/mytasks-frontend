import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/authApi";


export const useAuth = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return {
        data,
        isLoading,
        isError,
    }
}