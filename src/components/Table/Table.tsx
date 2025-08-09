import c from "./Table.module.scss";
import clsx from "clsx";

type TableProps = {
  headers: string[];
  rows: string[][];
  className?: string;
} & React.HTMLAttributes<HTMLTableElement>;

const Table: React.FC<TableProps> = ({
  headers,
  rows,
  className,
  ...handlers
}) => {
  return (
    <table className={clsx(c.table, className)} {...handlers}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className={c.header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className={c.row}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className={c.cell}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
