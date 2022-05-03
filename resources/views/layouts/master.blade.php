<x-partials.header_inc/>
	<div 
		x-data="App" 
		id="page-container" 
		class="sidebar-o sidebar-dark enable-page-overlay side-scroll page-header-fixed side-trans-enabled"
	>
		<!-- Side Overlay-->
		{{-- <x-partials.side_overlay/> --}}
		<!-- END Side Overlay -->

		<!-- Sidebar -->
		<x-partials.sidebar/>
		<!-- END Sidebar -->
			
		<!-- Header -->
		<x-partials.top_header/>
		<!-- END Header -->

		<!-- Main Container -->
		<main id="main-container">
			<!-- Page Content -->
			{{ $slot }}
			<!-- END Page Content -->
		</main>
		<!-- END Main Container -->

		<!-- Footer -->
		<x-partials.footer/>
		<!-- END Footer -->
	</div>
<x-partials.footer_inc/>
