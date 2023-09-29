import { Navigate, Route, Routes } from "react-router-dom"

import { AuthRouter } from "../context/auth/router/AuthRouter"
import { MusicRouter } from "../context/contextMusic/router/MusicRouter";
import { LoadingAnimation } from "./LoadingAnimation";
import { chekingUser } from "../../helpers/chekingStatus";
import { Box } from "@chakra-ui/react";

export const AppRouter = () => {

  const {status} = chekingUser();

  if(status === 'Cheking'){
    return (
      <Box bg="background">
        <LoadingAnimation />
      </Box>
    );
    }
    

  return (
    <Box bg="background">
      <Routes>
        {status === "Autenticated" ? (
          <Route path="/*" element={<MusicRouter />} />
        ) : (
          <Route path="auth/*" element={<AuthRouter />} />
        )}

        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </Box>
  );
}

