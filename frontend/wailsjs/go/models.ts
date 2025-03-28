export namespace services {
	
	export class CPU {
	    name: string;
	
	    static createFrom(source: any = {}) {
	        return new CPU(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	    }
	}
	export class Disk {
	    size: string;
	    type: string;
	
	    static createFrom(source: any = {}) {
	        return new Disk(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.size = source["size"];
	        this.type = source["type"];
	    }
	}
	export class GPU {
	    cards: string[];
	    resolution: string;
	    isTouchScreen: boolean;
	
	    static createFrom(source: any = {}) {
	        return new GPU(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.cards = source["cards"];
	        this.resolution = source["resolution"];
	        this.isTouchScreen = source["isTouchScreen"];
	    }
	}
	export class OS {
	    modelName: string;
	    os: string;
	    windowsActivated: boolean;
	
	    static createFrom(source: any = {}) {
	        return new OS(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.modelName = source["modelName"];
	        this.os = source["os"];
	        this.windowsActivated = source["windowsActivated"];
	    }
	}
	export class RAM {
	    size: string;
	    slots: number;
	
	    static createFrom(source: any = {}) {
	        return new RAM(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.size = source["size"];
	        this.slots = source["slots"];
	    }
	}
	export class Storage {
	    disks: Disk[];
	    total: string;
	
	    static createFrom(source: any = {}) {
	        return new Storage(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.disks = this.convertValues(source["disks"], Disk);
	        this.total = source["total"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Windows {
	    isActivated: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Windows(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.isActivated = source["isActivated"];
	    }
	}

}

