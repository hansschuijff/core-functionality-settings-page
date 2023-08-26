/* eslint-disable camelcase */
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	// BaseControl,
	// Button,
	// ExternalLink,
	PanelBody,
	PanelRow,
	Placeholder,
	Spinner,
	ToggleControl
} = wp.components;

const {
	render,
	Component,
	Fragment
} = wp.element;

/**
 * Internal dependencies
 */
import './style.scss';

class App extends Component {
	constructor() {
		super( ...arguments );

		this.changeOptions = this.changeOptions.bind( this );

		this.state = {
			isAPILoaded: false,
			isAPISaving: false,
			dewitteprins_cf_settings_page: false,
			dewitteprins_cf_remove_query_strings_static_files: false,
			dewitteprins_cf_write_to_log: false,
			dewitteprins_cf_content_insert_module: false,
			dewitteprins_cf_custom_post_types_module: false,
			dewitteprins_cf_customizer: false,
			dewitteprins_cf_write_to_log: false,
			dewitteprins_cf_debug_functions: false,
			dewitteprins_cf_development_module: false,
			dewitteprins_cf_sensei_lms_sortable_drip_schedule: false,
			dewitteprins_cf_insert_toc: false,
			dewitteprins_cf_testimonials: false,
		};
	}

	componentDidMount() {
		wp.api.loadPromise.then( () => {
			this.settings = new wp.api.models.Settings();

			if ( false === this.state.isAPILoaded ) {
				this.settings.fetch().then( response => {
					this.setState({
						dewitteprins_cf_analytics_status: Boolean( response.dewitteprins_cf_analytics_status ),
						dewitteprins_cf_settings_page: Boolean( response.dewitteprins_cf_settings_page ),
						dewitteprins_cf_remove_query_strings_static_files: Boolean( response.dewitteprins_cf_remove_query_strings_static_files ),
						dewitteprins_cf_write_to_log: Boolean( response.dewitteprins_cf_write_to_log ),
						dewitteprins_cf_content_insert_module: Boolean( response.dewitteprins_cf_content_insert_module ),
						dewitteprins_cf_custom_post_types_module: Boolean( response.dewitteprins_cf_custom_post_types_module ),
						dewitteprins_cf_customizer: Boolean( response.dewitteprins_cf_customizer ),
						dewitteprins_cf_write_to_log: Boolean( response.dewitteprins_cf_write_to_log ),
						dewitteprins_cf_debug_functions: Boolean( response.dewitteprins_cf_debug_functions ),
						dewitteprins_cf_development_module: Boolean( response.dewitteprins_cf_development_module ),
						dewitteprins_cf_sensei_lms_sortable_drip_schedule: Boolean( response.dewitteprins_cf_sensei_lms_sortable_drip_schedule ),
						dewitteprins_cf_insert_toc: Boolean( response.dewitteprins_cf_insert_toc ),
						dewitteprins_cf_testimonials: Boolean( response.dewitteprins_cf_testimonials ),
						isAPILoaded: true
					});
				});
			}
		});
	}

	changeOptions( option, value ) {
		this.setState({ isAPISaving: true });

		const model = new wp.api.models.Settings({
			// eslint-disable-next-line camelcase
			[option]: value
		});

		model.save().then( response => {
			this.setState({
				[option]: response[option],
				isAPISaving: false
			});
		});
	}

	render() {
		if ( ! this.state.isAPILoaded ) {
			return (
				<Placeholder>
					<Spinner/>
				</Placeholder>
			);
		}

		return (
			<Fragment>
				<div className="dewitteprins-header">
					<div className="dewitteprins-container">
						<div className="dewitteprins-logo">
							<h1>{ __( 'Core Functionality' ) }</h1>
						</div>
					</div>
				</div>
				<div className="dewitteprins-main">
					<PanelBody
						title={ __( 'Optional Features' ) }
					>
						<PanelRow>
							<ToggleControl
								label    = { __( 'Setting page?' ) }
								help     = { 'Enable or disable the setting page functionality.' }
								checked  = { this.state.dewitteprins_cf_settings_page }
								onChange = { () => this.changeOptions( 'dewitteprins_cf_settings_page', ! this.state.dewitteprins_cf_settings_page ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label    = { __( 'Remove query string from static files?' ) }
								help     = { 'Enable or disable the Remove query string from static files functionality.' }
								checked  = { this.state.dewitteprins_cf_remove_query_strings_static_files }
								onChange = { () => this.changeOptions( 'dewitteprins_cf_remove_query_strings_static_files', ! this.state.dewitteprins_cf_remove_query_strings_static_files ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label    = { __( 'Load content insert module?' ) }
								help     = { 'Enable or disable the content insert functionality.' }
								checked  = { this.state.dewitteprins_cf_content_insert_module }
								onChange = { () => this.changeOptions( 'dewitteprins_cf_content_insert_module', ! this.state.dewitteprins_cf_content_insert_module ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label    = { __( 'Load custom post types functionality?' ) }
								help     = { 'Enable or disable the custom post types functionality.' }
								checked  = { this.state.dewitteprins_cf_custom_post_types_module }
								onChange = { () => this.changeOptions( 'dewitteprins_cf_custom_post_types_module', ! this.state.dewitteprins_cf_custom_post_types_module ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label    = { __( 'Customizer?' ) }
								help     = { 'Enable or disable the customizer functionality.' }
								checked  = { this.state.dewitteprins_cf_customizer }
								onChange = { () => this.changeOptions( 'dewitteprins_cf_customizer', ! this.state.dewitteprins_cf_customizer ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label    = { __( 'Write to log?' ) }
								help     = { 'Enable or disable the write to log functionality.' }
								checked  = { this.state.dewitteprins_cf_write_to_log }
								onChange = { () => this.changeOptions( 'dewitteprins_cf_write_to_log', ! this.state.dewitteprins_cf_write_to_log ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label    = { __( 'Debugging?' ) }
								help     = { 'Enable or disable the debug functionality.' }
								checked  = { this.state.dewitteprins_cf_debug_functions }
								onChange = { () => this.changeOptions( 'dewitteprins_cf_debug_functions', ! this.state.dewitteprins_cf_debug_functions ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label    = { __( 'Load development module?' ) }
								help     = { 'Enable or disable the development functionality.' }
								checked  = { this.state.dewitteprins_cf_development_module }
								onChange = { () => this.changeOptions( 'dewitteprins_cf_development_module', ! this.state.dewitteprins_cf_development_module ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label    = { __( 'Make Sensei LMS drip schedule sortable?' ) }
								help     = { 'Enable or disable the Make Sensei LMS drip schedule sortable functionality.' }
								checked  = { this.state.dewitteprins_cf_sensei_lms_sortable_drip_schedule }
								onChange = { () => this.changeOptions( 'dewitteprins_cf_sensei_lms_sortable_drip_schedule', ! this.state.dewitteprins_cf_sensei_lms_sortable_drip_schedule ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label    = { __( 'Insert TOC?' ) }
								help     = { 'Enable or disable the Insert TOC functionality.' }
								checked  = { this.state.dewitteprins_cf_insert_toc }
								onChange = { () => this.changeOptions( 'dewitteprins_cf_insert_toc', ! this.state.dewitteprins_cf_insert_toc ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label    = { __( 'Testimonials?' ) }
								help     = { 'Enable or disable the testimonials functionality.' }
								checked  = { this.state.dewitteprins_cf_testimonials }
								onChange = { () => this.changeOptions( 'dewitteprins_cf_testimonials', ! this.state.dewitteprins_cf_testimonials ) }
							/>
						</PanelRow>
					</PanelBody>
				</div>
			</Fragment>
		);
	}
}

render(
	<App/>,
	document.getElementById( 'dewitteprins-core-functionality-settings' )
);
