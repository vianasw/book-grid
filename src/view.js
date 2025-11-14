/**
 * Add responsive and interactive behaviors using JS on the front-end.
 */
document.addEventListener( 'DOMContentLoaded', function () {
	const grids = document.querySelectorAll( '.book-grid' );
	grids.forEach( ( grid ) => {
		// Responsive column switching
		const updateCols = () => {
			const w = window.innerWidth;
			const desktop = grid.getAttribute( 'data-cols-desktop' ) || 4;
			const tablet = grid.getAttribute( 'data-cols-tablet' ) || 2;
			const mobile = grid.getAttribute( 'data-cols-mobile' ) || 1;
			if ( w <= 640 ) {
				grid.style.setProperty(
					'grid-template-columns',
					`repeat(${ mobile }, 1fr)`
				);
				grid.style.setProperty( '--cols-mobile', mobile );
			} else if ( w <= 880 ) {
				grid.style.setProperty(
					'grid-template-columns',
					`repeat(${ tablet }, 1fr)`
				);
				grid.style.setProperty( '--cols-tablet', tablet );
			} else {
				grid.style.setProperty(
					'grid-template-columns',
					`repeat(${ desktop }, 1fr)`
				);
			}
		};
		updateCols();
		window.addEventListener( 'resize', updateCols, { passive: true } );
	} );
} );
