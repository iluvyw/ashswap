import Layout from '@/components/Layout';
import Trading from '@/components/pages/Trading';
import Header from '@/components/pages/Trading/Header';

export default function IndexPage() {
  return (
    <Layout title="Trading">
      <main>
        <div className="block min-h-screen">
          <div>
            <Header />
          </div>
          <div className="min-h-screen">
            <Trading />
          </div>
        </div>
      </main>
    </Layout>
  );
}
