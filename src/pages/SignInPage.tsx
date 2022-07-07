import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useUserActions from "../actions/useUserActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, TypeOf } from "yup";
import { baseURL } from "../app/request";
import { IconButton } from "@mui/material";
import { RefreshOutlined } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/Cat-Family">
        Cat Family
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

// form validation rules
const validationSchema = object({
  storeCode: string()
    .required("商家码不能为空")
    .matches(/^[A-Z]{4}$/, "商家码格式错误"),
  username: string().required("用户名不能为空"),
  password: string().required("密码不能为空"),
  randomkey: string().required("验证码不能为空"),
});

type ValidationInput = TypeOf<typeof validationSchema>;

export default function SignInSide() {
  const userActions = useUserActions();
  const [loading, setLoading] = useState<boolean>(false);
  const [checkCode, setCheckCode] = useState<number>(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
    setError,
  } = useForm<ValidationInput>({
    resolver: yupResolver(validationSchema),
  });

  const onsubmit = async (value: ValidationInput) => {
    setLoading(true);
    const res = await userActions.login(
      value.storeCode as string,
      value.username as string,
      value.password as string,
      value.randomkey as string
    );
    if (res.message === "验证码错误") {
      setFocus("randomkey");
      setError("randomkey", { type: "custom", message: "验证码错误" });
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 5,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              登 录
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onsubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="storeCode"
                label="商家码"
                autoComplete="store-code"
                autoFocus
                {...register("storeCode")}
                error={errors.hasOwnProperty("storeCode")}
                helperText={errors.storeCode?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="用户名"
                autoComplete="user-name"
                {...register("username")}
                error={errors.hasOwnProperty("username")}
                helperText={errors.username?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="密码"
                type="password"
                id="password"
                autoComplete="password"
                {...register("password")}
                error={errors.hasOwnProperty("password")}
                helperText={errors.password?.message}
              />

              <TextField
                margin="normal"
                required
                label="验证码"
                fullWidth
                id="randomkey"
                autoComplete="randomkey"
                {...register("randomkey")}
                error={errors.hasOwnProperty("randomkey")}
                helperText={errors.randomkey?.message}
              />
              <Box
                width="100%"
                pt=".8rem"
                display="flex"
                alignItems="end"
                justifyContent="space-between"
              >
                <img
                  src={`${baseURL}/qy/api/common/captchaImage?checkCode=${checkCode}`}
                />
                <IconButton
                  onClick={() => {
                    setCheckCode((pre) => (pre += 1));
                    console.log(checkCode);
                  }}
                >
                  <RefreshOutlined fontSize="small" />
                </IconButton>
              </Box>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
              >
                登录
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    忘记密码?
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
