import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import useUserActions from "../actions/useUserActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, TypeOf } from "yup";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import AspectRatio from "@mui/joy/AspectRatio";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

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

// form validation rules
const validationSchema = object({
  storeCode: string()
    .required("商家码不能为空")
    .matches(/^[A-Z]{4}$/, "商家码格式错误"),
  username: string().required("用户名不能为空"),
  password: string().required("密码不能为空"),
});

type ValidationInput = TypeOf<typeof validationSchema>;

export default function SignInSide() {
  const userActions = useUserActions();
  const [loading, setLoading] = useState<boolean>(false);

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
    await userActions.login(
      value.storeCode as string,
      value.username as string,
      value.password as string
    );
    setLoading(false);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
        }}
      >
        <AspectRatio objectFit="contain" minHeight="100vh">
          <img
            src="https://qy-jz.oss-cn-beijing.aliyuncs.com/jz/%E9%AB%98%E6%B8%85logo%E9%80%8F%E6%98%8E%E5%BA%95%E5%8E%9F%E8%89%B2%E5%AD%97.png"
            srcSet="https://qy-jz.oss-cn-beijing.aliyuncs.com/jz/%E9%AB%98%E6%B8%85logo%E9%80%8F%E6%98%8E%E5%BA%95%E5%8E%9F%E8%89%B2%E5%AD%97.png"
            alt="A beautiful landscape."
          />
        </AspectRatio>
      </Grid>
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
            <Box sx={{ m: 1, position: "relative" }}>
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                color="primary"
                sx={{ mt: 3, mb: 2 }}

                // loading={loading}
              >
                登录
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>

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
  );
}
