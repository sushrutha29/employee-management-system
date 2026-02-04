import Layout from "../../components/common/Layout";

function Profile() {
  return (
    <Layout>
      <h1 className="page-title">Employee Profile</h1>
      <p className="page-subtitle">Personal information and employment details.</p>
      <div className="card">
        <p className="text-gray-600">Profile details go here.</p>
      </div>
    </Layout>
  );
}

export default Profile;
