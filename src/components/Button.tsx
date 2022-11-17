interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      className="bg-slate-800 hover:bg-slate-700 h-24 w-24 grid place-items-center rounded-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
