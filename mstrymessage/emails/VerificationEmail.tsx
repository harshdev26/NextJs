import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from '@react-email/components';

interface VerificationEmailProps {  //this is used because to define the props type for the component or we can say that it defines the shape of the data that the component expects to recieve.
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) { //destructuring the props object to extract the username and otp properties from the props object. this allows us to use username and otp directly in the component without needing to access them through props.username and props otp
//This component is used to create a verification email template that can be sent to users when they register or need to verify their account. 
    return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana" //fallback font family is used in case the primary font is not available
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2', //this is the url of the font file that we will use in the email template.
            format: 'woff2', //this is the format of the font file that we will use in the email template.
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {username},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please use the following verification
            code to complete your registration:
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text> 
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
        {/* <Row>
          <Button
            href={`http://localhost:3000/verify/${username}`}
            style={{ color: '#61dafb' }}
          >
            Verify here
          </Button>
        </Row> */}
      </Section>
    </Html>
  );
}