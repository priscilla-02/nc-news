import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="text-white bg-sky-600 pb-4 ">
      <div className="container flex flex-col items-center justify-between p-3 mx-auto space-y-4 sm:space-y-0 sm:flex-row ">
        <div className="flex items-center">
          <div className="mx-7">
            <a href="https://github.com/priscilla-02" target="_blank">
              <GitHubIcon style={{ fontSize: 25 }} />
            </a>
          </div>
          <div className="mx-5">
            <a
              href="https://www.linkedin.com/in/priscilla-chan-554153138/"
              target="_blank"
            >
              <LinkedInIcon style={{ fontSize: 30 }} />
            </a>
          </div>
        </div>
        <p className="text-xs">© Copyright 2023. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
