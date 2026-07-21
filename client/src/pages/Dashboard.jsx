import { useCallback, useEffect, useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlTable from '../components/UrlTable';
import * as urlApi from '../api/urlApi';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const fetchUrls = useCallback(async () => {
    try {
      const data = await urlApi.getUrls();
      setUrls(data.urls);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const handleCreate = async (originalUrl, customAlias) => {
    setCreating(true);
    setError('');
    try {
      const data = await urlApi.createUrl(originalUrl, customAlias);
      setUrls((prev) => [data.url, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = async (id, updates) => {
    const data = await urlApi.updateUrl(id, updates);
    setUrls((prev) =>
      prev.map((url) => (url.id === id ? data.url : url))
    );
  };

  const handleDelete = async (id) => {
    try {
      await urlApi.deleteUrl(id);
      setUrls((prev) => prev.filter((url) => url.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Manage your shortened links and track click performance</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <UrlForm onSubmit={handleCreate} loading={creating} />

      {loading ? (
        <div className="loading-container">
          <p>Loading your URLs...</p>
        </div>
      ) : (
        <UrlTable urls={urls} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Dashboard;
