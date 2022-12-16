import PropTypes from 'prop-types';
import { SvgIcon } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

function useDynamicSVGImport(name) {
  const ImportedIconRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        ImportedIconRef.current = (
          await import(`../assets/svg/${name}.svg`)
        ).ReactComponent;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name]);

  return { error, loading, DynamicIcon: ImportedIconRef.current };
}

export default function DynamicSvgIcon({ name, ...rest }) {
  const { error, loading, DynamicIcon } = useDynamicSVGImport(name);
  if (error) {
    return error.message;
  }
  if (loading) {
    return 'Loading...';
  }
  if (DynamicIcon) {
    return <SvgIcon component={DynamicIcon} {...rest} />;
    // return <DynamicSvgIcon {...rest} />;
  }
  return null;
}
