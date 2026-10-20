// Shared content shapes. Each one will become a Sanity schema later,
// so pages already receive data in the shape the CMS will return.

export type NavLink = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  description: string;
};
