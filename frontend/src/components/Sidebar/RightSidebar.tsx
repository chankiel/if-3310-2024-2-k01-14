import React from "react";

const RightSidebar = ({ children }: { children?: React.ReactNode }) => {
  const footer_component = [
    "About",
    "Accessibility",
    "Help Center",
    "Privacy & Terms",
    "Advertising Options",
    "Advertising",
    "Business Services",
    "Get the LinkedIn app",
    "Other",
  ];
  return (
    <aside className="w-[250px] self-start sticky top-[90px] hidden xl:block">
      {children}
      <div className="rounded-lg overflow-hidden mb-4 border-linkin-border border-2">
        <img
          src="/images/side-photo.png"
          alt="side-photo"
          className="w-[250px]"
        />
      </div>

      <ul className="px-5 py-4 flex flex-wrap gap-5 justify-center items-center">
        {footer_component.map((comp) => (
          <li className="text-xs text-[#62615F]">{comp}</li>
        ))}
      </ul>
      <div className="px-3 flex items-center gap-1">
        <img src="/images/linkedin-long.svg" alt="linkedin-long" />
        <p className="text-xs font-semibold">LinkedIn Corporation © 2024</p>
      </div>
    </aside>
  );
};

export default RightSidebar;
