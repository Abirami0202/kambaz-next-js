import Link from "next/link";

export default function AccountSidebar() {
  return (
    <nav id="wd-account-sidebar" style={{ float: "left", width: "200px", paddingRight: "1rem" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>
          <Link href="/Kambaz/Account/Signin" id="wd-link-signin">
            Signin
          </Link>
        </li>
        <li>
          <Link href="/Kambaz/Account/Signup" id="wd-link-signup">
            Signup
          </Link>
        </li>
        <li>
          <Link href="/Kambaz/Account/Profile" id="wd-link-profile">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}
