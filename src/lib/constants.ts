export const links = {
  resume:
    "https://drive.google.com/file/d/1TcgUk40YebOBtal4jhggvzjEtNWvWOxD/view?usp=sharing",
  github: "https://github.com/santhosh274",
  linkedin:
    "https://www.linkedin.com/in/santhosh-kumarr-a-ace277",
  email: "santhoshkumarr.a7@gmail.com",
};

export const cardColors = {
  emerald: {
    hoverBorder: "hover:border-emerald-500/50",
    text: "text-emerald-500",
    tagText: "text-emerald-400",
    tagBg: "bg-emerald-500/5",
    cardBg: "bg-emerald-500/[0.03]",
    cardBorder: "border-emerald-500/5",
  },
  purple: {
    hoverBorder: "hover:border-purple-500/50",
    text: "text-purple-500",
    tagText: "text-purple-400",
    tagBg: "bg-purple-500/5",
    cardBg: "bg-purple-500/[0.03]",
    cardBorder: "border-purple-500/5",
  },
  rose: {
    hoverBorder: "hover:border-rose-500/50",
    text: "text-rose-500",
    tagText: "text-rose-400",
    tagBg: "bg-rose-500/5",
    cardBg: "bg-rose-500/[0.03]",
    cardBorder: "border-rose-500/5",
  },
  teal: {
    hoverBorder: "hover:border-teal-600/50",
    text: "text-teal-600",
    tagText: "text-teal-600",
    tagBg: "bg-teal-600/5",
    cardBg: "bg-teal-600/[0.03]",
    cardBorder: "border-teal-600/5",
  },
};

export type CardColor = keyof typeof cardColors;

export const DURATION = 0.25;
export const STAGGER = 0.025;
