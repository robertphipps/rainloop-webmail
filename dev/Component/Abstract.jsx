
import {$} from 'common';
import {isUnd} from 'Common/Utils';
import ko from 'ko';

class AbstractComponent
{
	disposable = [];

	constructor() {}

	dispose() {
		this.disposable.forEach((funcToDispose) => {
			if (funcToDispose && funcToDispose.dispose)
			{
				funcToDispose.dispose();
			}
		});
	}
}

/**
 * @param {*} ClassObject
 * @param {string} templateID = ''
 * @return {Object}
 */
const componentExportHelper = (ClassObject, templateID = '') => {
	return {
		template: templateID ? {element: templateID} : '<b></b>',
		viewModel: {
			createViewModel: (params, componentInfo) => {

				params = params || {};
				params.element = null;

				if (componentInfo && componentInfo.element)
				{
					params.component = componentInfo;
					params.element = $(componentInfo.element);

					require('Common/Translator').i18nToNodes(params.element);

					if (!isUnd(params.inline) && ko.unwrap(params.inline))
					{
						params.element.css('display', 'inline-block');
					}
				}

				return new ClassObject(params);
			}
		}
	};
};

export {AbstractComponent, componentExportHelper};
