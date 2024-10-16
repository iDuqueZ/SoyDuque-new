import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Importa el idioma español

const AstroComponent = ({ url, imageUrl, title, date, autor, tags }) => {

  const dateObj = new Date(date);
  const fechaFormateada = format(dateObj, 'dd/MMM/yyyy', { locale: es });


  return (
    <li className="bg-zinc-800 rounded-md shadow-md  overflow-hidden">
      <a href={url} className="text-zinc-50 group">
      <div className="flex w-full justify-between flex-row-reverse">

          <div className="h-100 w-3/12 max-w-[180px] overflow-hidden hidden md:block">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full max-h-[180px] object-cover rounded-r-md transition-scale brightness-75 duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-100"
            />
          </div>

          <div className="p-4 w-full md:w-[80%]">
            <h2 className="text-2xl text-zinc-100 group-hover:text-teal-400 underline-offset-4 group-hover:underline group-hover:decoration-dashed font-semibold mb-2">{title}</h2>
            <p className="text-sm text-zinc-400 mb-2">{autor}</p>
            <span className="text-sm text-zinc-400">{fechaFormateada}</span>

            <div className="flex md:flex-wrap mt-4 h-[35px] md:h-auto overflow-x-scroll overflow-y-hidden w-[85vw] items-center tags">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-neutral-600 text-neutral-100 text-xs font-medium rounded-full py-2 px-3 mr-2 md:mb-2 h-8 whitespace-nowrap text-ellipsis overflow-hidden"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>
      </div>
      </a>
    </li>
  );
};

export default AstroComponent;
