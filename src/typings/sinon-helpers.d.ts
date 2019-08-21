declare namespace SinonHelpers {
    function getStubConstructor<T = {}>(originalConstructor?: T): StubConstructor<T>
    function getSpyConstructor<T = {}>(originalConstructor?: T): SpyConstructor<T>

    class StubOrSpyConstructor<T> {
        args: any[];
        instances: T[];
        getInstance(index?: number): T;
        withInit(instance: T): void;
    }

    class StubConstructor<T> extends StubOrSpyConstructor<T> {}
    class SpyConstructor<T> extends StubOrSpyConstructor<T> {}

}

export = SinonHelpers;