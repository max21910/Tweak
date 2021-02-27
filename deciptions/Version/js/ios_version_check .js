//created by max21910 
//please d'ont copy my friend tell me before at Maxime21160@icloud.com :)
var VERSION_CHECK_SUPPORTED = "Votre version IOS est compatible! &#3EFF00;";
var VERSION_CHECK_NEEDS_UPGRADE = "Necesite au moin IOS %s &#FF8B00;";
var VERSION_CHECK_UNCONFIRMED = "Pas encore tester sur IOS %s &#004DFF;";
var VERSION_CHECK_UNSUPPORTED = "Seulement compatible de Ios %s a %s &#FF0000;";

function ios_version_check(minIOS,maxIOS,otherIOS,callBack) {
	"use strict";


	function parseVersionString(version) {
		var bits = version.split(".");
		return [
				parseInt(bits[0], 10),
				parseInt(bits[1] ? bits[1] : 0, 10),
				parseInt(bits[2] ? bits[2] : 0, 10)
			   ];
	}

	function compareVersions(one, two) {

		for (var i = 0; i < one.length; ++i) {
			if (two.length == i) {
				return 1;
			}

			if (one[i] == two[i]) {
				continue;
			} else if (one[i] > two[i]) {
				return 1;
			} else {
				return -1;
			}
		}

		if (one.length != two.length) {
			return -1;
		}

		return 0;
	}

	var version = navigator.appVersion.match(/CPU( iPhone)? OS (\d+)_(\d+)(_(\d+))? like/i);
	if (!version) {
		return 0;
	}

	var osVersion = [
						parseInt(version[2], 10),
						parseInt(version[3], 10),
						parseInt(version[4] ? version[5] : 0, 10)
					],

		osString = osVersion[0] + "." + osVersion[1] + (osVersion[2] && osVersion[2] != 0 ? "." + osVersion[2] : ""),
		minString = minIOS,
		maxString = maxIOS,

		minVersion = parseVersionString(minString),
		maxVersion = maxString ? parseVersionString(maxString) : null,

		message = VERSION_CHECK_SUPPORTED,
		isBad = false;

	if (compareVersions(minVersion, osVersion) == 1) {
		message = VERSION_CHECK_NEEDS_UPGRADE.replace("%s", minString);
		isBad = true;
	} else if (maxVersion && compareVersions(maxVersion, osVersion) == -1) {
		if ("unsupported" == otherIOS) {
			message = VERSION_CHECK_UNSUPPORTED.replace("%s", minString).replace("%s", maxString);
		} else {
			message = VERSION_CHECK_UNCONFIRMED.replace("%s", osString);
		}

		isBad = true;
	}
	callBack(message,isBad);

	return (isBad?-1:1);
}
