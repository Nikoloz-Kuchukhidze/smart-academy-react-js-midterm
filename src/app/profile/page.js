async function getProfile() {
  const response = await fetch("https://fakestoreapi.com/users/3", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Profile could not be loaded");
  }
  return response.json();
}

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <main className="page-shell profile-shell">
      <section className="profile-card">
        <div className="profile-header">
          <div className="avatar">{profile.name?.firstname?.[0]}{profile.name?.lastname?.[0]}</div>
          <div>
            <p className="profile-label">Customer profile</p>
            <h1>
              {profile.name?.firstname} {profile.name?.lastname}
            </h1>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-item">
            <span>Email</span>
            <strong>{profile.email}</strong>
          </div>
          <div className="profile-item">
            <span>Phone</span>
            <strong>{profile.phone}</strong>
          </div>
          <div className="profile-item">
            <span>Username</span>
            <strong>{profile.username}</strong>
          </div>
          <div className="profile-item">
            <span>City</span>
            <strong>{profile.address?.city}</strong>
          </div>
          <div className="profile-item wide">
            <span>Address</span>
            <strong>
              {profile.address?.street}, {profile.address?.number}, {profile.address?.zipcode}
            </strong>
          </div>
        </div>
      </section>
    </main>
  );
}
