export const BaseBody = ({ children }: { children: JSX.Element }) => {
  return (
    <body class="h-[100%] w-[100%] fixed overflow-y-auto">
      <div class="flex flex-col text-center items-center justify-center px-4 py-16 gap-4 min-h-[100%]">
        {children}
      </div>
    </body>
  );
};
