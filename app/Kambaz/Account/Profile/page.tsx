"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as client from "../client";
import { setCurrentUser } from "../reducer";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [profile, setProfile] = useState<any>({});

  const fetchProfile = async () => {
    if (!currentUser) {
      router.push("/Kambaz/Account/Signin");
      return;
    }
    setProfile(currentUser);
  };

  useEffect(() => {
    fetchProfile();
  }, [currentUser]);

  const handleUpdate = async () => {
    try {
      const updatedUser = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedUser));
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  const handleSignout = async () => {
    try {
      await client.signout();
      dispatch(setCurrentUser(null));
      router.push("/Kambaz/Account/Signin");
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) return null;

  return (
    <div id="wd-profile-screen" style={{ padding: "2rem", maxWidth: "400px" }}>
      <h3>Profile</h3>
      <Form>
        <Form.Control
          id="wd-username"
          value={profile.username || ""}
          className="mb-2"
          placeholder="username"
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        />
        <Form.Control
          id="wd-password"
          value={profile.password || ""}
          type="password"
          className="mb-2"
          placeholder="password"
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        />
        <Form.Control
          id="wd-firstname"
          value={profile.firstName || ""}
          className="mb-2"
          placeholder="First Name"
          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        />
        <Form.Control
          id="wd-lastname"
          value={profile.lastName || ""}
          className="mb-2"
          placeholder="Last Name"
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        />
        <Form.Control
          id="wd-dob"
          value={profile.dob?.split('T')[0] || ""}
          type="date"
          className="mb-2"
          onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
        />
        <Form.Control
          id="wd-email"
          value={profile.email || ""}
          type="email"
          className="mb-2"
          placeholder="email"
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
        <Form.Select
          id="wd-role"
          value={profile.role || "USER"}
          className="mb-2"
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </Form.Select>
        <Button
          id="wd-update-btn"
          onClick={handleUpdate}
          variant="primary"
          className="w-100 mb-2"
        >
          Update
        </Button>
        <Button
          id="wd-signout-btn"
          onClick={handleSignout}
          variant="danger"
          className="w-100"
        >
          Sign out
        </Button>
      </Form>
    </div>
  );
}