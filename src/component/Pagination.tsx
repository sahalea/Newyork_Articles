

/**
 * Pagination component.
 * When a button is clicked, it changes the current page,
 * fetches new articles, and renders them using hook functions.
 * 
 * @param param0 - Component props
 * @returns JSX.Element
 */
export default function Pagination({ currentPage, setCurrentPage }: any) {

	/**
	 * The API currently supports pagination for three specific time periods: 
	 * 1,7,and 30 .
	 */
	const btnGroup : { name: string; value: number; }[]= [
		{
			name: '1',
			value: 1
		},{
			name: '2',
			value: 7
		},{
			name: '3',
			value: 30
		}
	]

	return (
		<div id={currentPage}  data-testid="pagination">
			{btnGroup.map(({ name, value }) => (
				<button
					key={name}
					onClick={() => setCurrentPage(value)}
					className="pagination-next px-2 py-1 border border-gray-400 mx-1 rounded hover:bg-gray-400 hover:text-white"
				>
					{name}
				</button>
			))}
		</div>
	);
}
