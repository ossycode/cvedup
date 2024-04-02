import React from "react";
import type { SVGProps } from "react";

const UpDownIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 56 56"
      {...props}
    >
      <path
        fill="currentColor"
        d="M13.785 49.574h28.453c4.899 0 7.336-2.437 7.336-7.265V13.69c0-4.828-2.437-7.265-7.336-7.265H13.785c-4.875 0-7.36 2.414-7.36 7.265v28.62c0 4.851 2.485 7.265 7.36 7.265m6.914-9.726c-1.031 0-1.734-.703-1.734-1.735V24.777l.14-3.914l-2.343 2.836l-1.946 2.227a1.677 1.677 0 0 1-1.242.515c-.96 0-1.687-.75-1.687-1.71c0-.493.14-.891.445-1.22l6.914-7.218c.445-.492.961-.68 1.453-.68c.54 0 1.078.188 1.524.68l6.843 7.219c.328.328.492.726.492 1.218a1.69 1.69 0 0 1-1.71 1.711c-.493 0-.961-.187-1.22-.515l-1.898-2.227l-2.437-2.883l.164 3.961v13.336c0 1.032-.727 1.735-1.758 1.735m15.797 0c-.516 0-1.031-.164-1.5-.657l-6.867-7.218c-.328-.328-.469-.75-.469-1.22c0-.96.703-1.733 1.688-1.733c.492 0 .914.21 1.218.515l1.946 2.227l2.39 2.86l-.187-3.938V17.37c0-1.055.75-1.758 1.781-1.758c1.008 0 1.734.703 1.734 1.758v13.313l-.164 3.96l2.414-2.882l1.899-2.227c.258-.305.726-.515 1.242-.515c.961 0 1.688.773 1.688 1.734c0 .469-.141.867-.47 1.219l-6.843 7.218a2.032 2.032 0 0 1-1.5.657"
      ></path>
    </svg>
  );
};

export default UpDownIcon;