import { FaEnvelope } from "react-icons/fa";
import { GithubIcon } from "./icons/Github";
import { GoodReadsIcon } from "./icons/GoodReads";
import { InstagramIcon } from "./icons/Instagram";
import { LinkedinIcon } from "./icons/Linkedin";

const iconClassName =
  "h-6 w-6 fill-celtic hover:fill-celtic-200 dark:fill-mint-400 hover:dark:fill-everglade-300";

export const SocialLinks = () => {
  return (
    <div className="bottom-4 mt-10 block md:fixed md:left-2 lg:left-4">
      <div className="flex flex-row gap-2 md:flex-col">
        <a href="https://github.com/grecoa66" target="_blank">
          <GithubIcon className={iconClassName} />
        </a>
        <a href="https://www.instagram.com/alexgreco4/" target="_blank">
          <InstagramIcon className={iconClassName} />
        </a>
        <a href="mailto:alex.k.greco.4@gmail.com" target="_blank">
          <FaEnvelope className={iconClassName} />
        </a>
        <a
          href="https://www.linkedin.com/in/alexander-greco-2a687270/"
          target="_blank"
        >
          <LinkedinIcon className={iconClassName} />
        </a>
        <a
          href="https://www.goodreads.com/user/show/94666405-alexander-k"
          target="_blank"
        >
          <GoodReadsIcon className={iconClassName} />
        </a>
      </div>
    </div>
  );
};
