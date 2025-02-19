import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, ArrowLeft, MailIcon } from 'lucide-react';
import Link from 'next/link';

export default function Verify() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
      <Card className="w-[380px] px-5">
        <CardHeader className="text-center">
          <div className="mb-4 mx-auto flex size-20 items-center justify-center rounded-full bg-blue-100">
            <MailIcon className="w-12 h-12 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Verify your email address
          </CardTitle>
          <CardDescription>
            We have sent a verification link to your email address. Please click
            on the link to verify your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 rounded-md bg-yellow-50 border-yellow-300 p-4">
            <div className="flex items-center">
              <AlertCircle className="w-12 h-12 text-yellow-500" />
              <p className="text-sm font-medium text-yellow-700 ml-4">
                Be sure to check your spam folder if you don't see the email in
                your inbox.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/" className={buttonVariants({
            className: 'w-full',
            variant: 'outline',
          })}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
