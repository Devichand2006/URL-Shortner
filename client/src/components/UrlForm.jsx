import { useState } from 'react';
import { isValidUrl, isValidAlias } from '../utils/validators';

const UrlForm = ({ onSubmit, loading }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!originalUrl.trim()) {
      newErrors.originalUrl = 'URL is required';
    } else if (!isValidUrl(originalUrl.trim())) {
      newErrors.originalUrl = 'Enter a valid URL starting with http:// or https://';
    }

    if (customAlias && !isValidAlias(customAlias)) {
      newErrors.customAlias =
        'Alias must be 3-20 characters (letters, numbers, hyphens, underscores)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(originalUrl.trim(), customAlias.trim());
    setOriginalUrl('');
    setCustomAlias('');
    setErrors({});
  };

  return (
    <form className="url-form card" onSubmit={handleSubmit}>
      <h2>Shorten a URL</h2>

      <div className="form-group">
        <label htmlFor="originalUrl">Long URL</label>
        <input
          id="originalUrl"
          type="url"
          placeholder="https://example.com/very/long/url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        {errors.originalUrl && (
          <span className="error-text">{errors.originalUrl}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="customAlias">Custom alias (optional)</label>
        <input
          id="customAlias"
          type="text"
          placeholder="my-link"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
        />
        {errors.customAlias && (
          <span className="error-text">{errors.customAlias}</span>
        )}
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Creating...' : 'Shorten URL'}
      </button>
    </form>
  );
};

export default UrlForm;
