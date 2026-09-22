import { LoginForm } from "@/src/features/login";
import { RegisterForm } from "@/src/features/register";
import { Typography } from "@/src/shared/components/typography";
import { Card, CardContent, CardHeader } from "@/src/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/shared/components/ui/tabs";

export function AuthWidget() {
  return (
    <Card className="w-1/3">
      <CardHeader>
        <Typography variant={"h2"}>Register your account</Typography>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login">
          <TabsList className="self-center">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
