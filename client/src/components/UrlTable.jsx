import { useState } from 'react';
import { formatDate, copyToClipboard } from '../utils/validators';
import Modal from './Modal';
import { isValidUrl, isValidAlias } from '../utils/validators';

const UrlTable = ({ urls, onEdit, onDelete }) => {
  const [copiedId, setCopiedId] = useState(null);
  const [editUrl, setEditUrl] = useState(null);
  const [editForm, setEditForm] = useState({ originalUrl: '', shortCode: '' });
  const [editErrors, setEditErrors] = useState({});
  const [editLoading, setEditLoading] = useState(false);

  const handleCopy = async (url) => {
    try {
      await copyToClipboard(url.shortUrl);
      setCopiedId(url.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      alert('Failed to copy to clipboard');
    }
  };

  const openEditModal = (url) => {
    setEditUrl(url);
    setEditForm({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
    });
    setEditErrors({});
  };

  const closeEditModal = () => {
    setEditUrl(null);
    setEditForm({ originalUrl: '', shortCode: '' });
    setEditErrors({});
  };

  const validateEdit = () => {
    const newErrors = {};

    if (!editForm.originalUrl.trim()) {
      newErrors.originalUrl = 'URL is required';
    } else if (!isValidUrl(editForm.originalUrl.trim())) {
      newErrors.originalUrl = 'Enter a valid URL with http:// or https://';
    }

    if (!editForm.shortCode.trim()) {
      newErrors.shortCode = 'Short code is required';
    } else if (!isValidAlias(editForm.shortCode.trim())) {
      newErrors.shortCode =
        'Short code must be 3-20 characters (letters, numbers, hyphens, underscores)';
    }

    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateEdit()) return;

    setEditLoading(true);
    try {
      await onEdit(editUrl.id, {
        originalUrl: editForm.originalUrl.trim(),
        shortCode: editForm.shortCode.trim(),
      });
      closeEditModal();
    } catch (err) {
      setEditErrors({ form: err.message });
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (url) => {
    if (!window.confirm(`Delete short URL "${url.shortCode}"?`)) return;
    await onDelete(url.id);
  };

  if (urls.length === 0) {
    return (
      <div className="card empty-state">
        <p>No shortened URLs yet. Create your first one above!</p>
      </div>
    );
  }

  return (
    <>
      <div className="card url-table-container">
        <h2>Your URLs</h2>
        <div className="table-wrapper">
          <table className="url-table">
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Clicks</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url.id}>
                  <td className="url-cell" title={url.originalUrl}>
                    <a href={url.originalUrl} target="_blank" rel="noreferrer">
                      {url.originalUrl}
                    </a>
                  </td>
                  <td>
                    <a href={url.shortUrl} target="_blank" rel="noreferrer">
                      {url.shortUrl}
                    </a>
                  </td>
                  <td>{url.clickCount}</td>
                  <td>{formatDate(url.createdAt)}</td>
                  <td className="actions-cell">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleCopy(url)}
                    >
                      {copiedId === url.id ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => openEditModal(url)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(url)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!editUrl} onClose={closeEditModal} title="Edit URL">
        <form onSubmit={handleEditSubmit}>
          <div className="form-group">
            <label htmlFor="editOriginalUrl">Destination URL</label>
            <input
              id="editOriginalUrl"
              type="url"
              value={editForm.originalUrl}
              onChange={(e) =>
                setEditForm({ ...editForm, originalUrl: e.target.value })
              }
            />
            {editErrors.originalUrl && (
              <span className="error-text">{editErrors.originalUrl}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="editShortCode">Short code</label>
            <input
              id="editShortCode"
              type="text"
              value={editForm.shortCode}
              onChange={(e) =>
                setEditForm({ ...editForm, shortCode: e.target.value })
              }
            />
            {editErrors.shortCode && (
              <span className="error-text">{editErrors.shortCode}</span>
            )}
          </div>

          {editErrors.form && (
            <span className="error-text">{editErrors.form}</span>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={closeEditModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={editLoading}
            >
              {editLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UrlTable;
