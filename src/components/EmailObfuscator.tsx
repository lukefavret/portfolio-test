/**
 * Constructs a safe mailto link on the client to avoid basic scraping.
 */
export interface EmailObfuscatorProps {
  user: string;
  domain: string;
}

export default function EmailObfuscator({ user, domain }: EmailObfuscatorProps) {
  const address = `${user}@${domain}`;
  return (
    <span>
      <a href={`mailto:${address}`} target="_blank" rel="noopener noreferrer">
        {address}
      </a>
      <noscript>{address}</noscript>
    </span>
  );
}
