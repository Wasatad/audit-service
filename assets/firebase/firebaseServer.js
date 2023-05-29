// import { initializeApp, credential } from "firebase-admin";
import { getApps, initializeApp, cert } from "firebase-admin/app";

const firebaseConfig = {
  type: "service_account",
  project_id: "moab-audit",
  private_key_id: "8514dc0cfe2257ada716a53c7c702e5039e05cc9",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCy+1bKoDztWFbt\ni1sY+oo6fmROKr/pF4HHZ97OjXZw7UVxkE1KenUmTLHnztHcGKmvEMOi2g6/qXSt\nQjExqlwlC4JLvKoC3tfFUhHZoanCceP/+vGL3lbsZSyv2wEGa9clocfUNQFMfOkV\n5lQzok67Ll/3qAZcVmLCHsJVXHZnxsMdU5FUUawSYw2QIUo7gkkNsNH8U50CO2un\nWHkfuCAv8jkPt6+7BV60ppi44slUfq7kLbIdxyVdHdrVgAddHH7JKXYMZ+Pz3Ytc\n1JHapzkYOqQZ1BVAuxVL8MU4rEAvVgYY2LQJ5AED2MeGKF5sdroIKKefxSNvbGOS\nYpAybf79AgMBAAECggEAMvNy3ybjgUt7H49ixQcZj5JIeqoXzMK42qu6lUFXHMmm\n0a/bGN8od1kw8gUB3+6Ta3dRwgviU/Ro9yOXPoS5S4BtvKK+ISgP86er1jD70xM5\n7TaiSYdnZk9c+8jUD2BmtFtMOCBIuN38OpRBlxtW31lRz34hJWsgHRPFjahPOrYy\nqJgjpOh+XTOWI3OyJSrWGMBE82RmyVclNCU9ZTXGEI9cPX6IVLamHhzp1vwXJ76M\nnXV/WyT96LZjuZW1rS/kCpmihGX1DXNQivRvW05ZAPcHOWLFTp6JpbhwR22GMWl5\nbCvmXzNoveRbJPTbqfl/QaJSr+ZBRsnZrocS05fsPwKBgQD5kUpZA/XOqY//MHvX\npQB1sCFE0lsacCpFyMLElBAGkaFgQp86bbkr0ct4rGdqAQICylUBUF46SCxHmgxc\n94O+q/oa01Zi3VXXz/7aBHDZdMkdK1UiJBGa4lRb9SNiTVnwpm5/1/vgDRTTSE3l\nvCE3SKjoRlweLM/fdR6ZBtzS4wKBgQC3mE5Y0DBZdVbgXTE+Wd71XeYVvcNSce56\ns0QWcbFYQrJXvH0MR3ISucJE1NIQhHiLQD7Idq782wUfZLwQnJXw8yqiavYG8Cw3\n7xi+oC/hAoAhnIBoi1ZFyvx77V8d2r6CeJ6ZjmM2tzR1UWLkOoDJNt7Qc0wQslpQ\n272XH1gsnwKBgGl9hoW17NMcTWe64L44WsdkWcuzdxrnypaQ0/Mv+s4sBKChyJh0\nBM+G8JDjnxrpriXrzJ6vkATmuQDTFuK9JQ0VuLRaHKvRjxWYL8uMEP96JACWbnft\n8xsbDDmKlxhYReo5D4AulaMRJHpil7rCGPA7YFo+U3XVz1BPO03H3tOtAoGBAIVA\n/4SIvr7/YqoAGfDGbAQtPgWDsRPS66OVH5Mmu/ByoFz7yssxxAMBXpZ03W7tp0xy\nud7n/YQ7N5GcnL9114KGC+jMt3s7sOx8FrqtK3MmTHeYzr6Se3C2ruEH3aSeku3B\nvGN5rFsXR/TquFssdzMUJ06mkIwB13metBHOx0HDAoGBAMeEgTUGRrINbodlGOfh\nfH3gr4aU9b5UUvsLJyFXY4n//Zcxhmm7PXXY6y7RQcVt4Y0qhsuVIBY+SvwXJYnI\nDukjcKfvxXLq+yluCHRfFUQXJGKCliKn536AJqXL8JPdVPZz5tH0s/wFkiH7ThNE\n1SMb1Rspqw6moeR+sP7LC32V\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-dhcqp@moab-audit.iam.gserviceaccount.com",
  client_id: "111999519864663810146",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dhcqp%40moab-audit.iam.gserviceaccount.com",
};

export default function useFirebaseServer() {
  let app;
  if (getApps().length === 0)
    app = initializeApp({
      credential: cert(firebaseConfig),
    });

  return {
    app,
  };
}
