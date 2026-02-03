import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SECRET_SEQUENCE = 'shemanthika@292504';

export function useSecretSequence() {
  const navigate = useNavigate();
  const typedRef = useRef('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only track single character keys
      if (e.key.length === 1) {
        typedRef.current += e.key.toLowerCase();
        
        // Keep only the last N characters (length of secret)
        if (typedRef.current.length > SECRET_SEQUENCE.length) {
          typedRef.current = typedRef.current.slice(-SECRET_SEQUENCE.length);
        }
        
        // Check if sequence matches
        if (typedRef.current === SECRET_SEQUENCE) {
          typedRef.current = '';
          navigate('/admin');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
}

