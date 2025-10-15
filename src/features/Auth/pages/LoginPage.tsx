import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginSchema } from "../rules/validationSchema";
import * as z from "zod";
import { useLoginAccount } from "../hooks/useAuth";
import { useAuthContext } from "../hooks/useAuthContext";
import { Eye, EyeOff } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { path } from "@/constants/path";

const defaultValues = { email: "", password: "", remember: false };
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const methods = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const { mutateAsync: login } = useLoginAccount();
  const { saveToken } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    login({ Email: data.email, Password: data.password }).then((response) => {
      saveToken(response.Item);
      const accessToken = response.Item.accessToken;
      const decodedToken: any = jwtDecode(accessToken);

      const userRole = decodedToken["role"];
      if (userRole === "Quản trị viên") {
        navigate(path.courseManagement);
      }
      setLoading(false);
    });
  };
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Card className="w-[500px] shadow-2xl p-2">
        <CardHeader className="border-none pb-2">
          <CardDescription className="text-xl text-gray-500 text-center">
            Vui lòng nhập thông tin để đăng nhập.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form
              className="space-y-5"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <FormField
                name="email"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Nhập email của bạn"
                        autoComplete="email"
                        className="mt-1 h-12 text-base px-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={methods.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-base">Mật khẩu</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu"
                            autoComplete="current-password"
                            className="mt-1 h-12 text-base px-4 pr-12"
                          />
                        </FormControl>

                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="flex items-center justify-between text-sm">
                <FormField
                  name="remember"
                  control={methods.control}
                  render={({ field }) => (
                    <FormItem className="m-0">
                      <FormControl>
                        <Checkbox
                          id="remember"
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal ml-2">
                        Ghi nhớ đăng nhập
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <a href="#" className="text-gray-500 hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-lg bg-green-500 hover:bg-green-600 text-white font-semibold mt-2 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-lg flex items-center justify-center gap-2 mt-1"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  width={24}
                  height={24}
                />
                Đăng nhập với Google
              </Button>
            </form>
          </FormProvider>
          <div className="mt-6 text-center text-sm text-gray-500">
            Chưa có tài khoản?
            <a
              href="#"
              className="ml-1 text-green-500 font-medium hover:underline"
            >
              Đăng ký miễn phí!
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
