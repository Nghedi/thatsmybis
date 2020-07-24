@extends('layouts.app')
@section('title', (!$character ? "Create" : "Edit") . " Character - " . config('app.name'))

@section('content')
<div class="container-fluid container-width-capped">
    <div class="row">
        <div class="col-xl-8 offset-xl-2 col-md-10 offset-md-1 col-12">
            <div class="row mb-3">
                @if ($character)
                    <div class="col-12 pt-2 bg-lightest rounded">
                        @include('character/partials/header', ['headerSize' => 1, 'showEdit' => false, 'titlePrefix' => ($character ? 'Edit ' : 'Create ')])
                    </div>
                @else
                    <div class="col-12 pt-2 mb-2">
                        <h1 class="font-wight-medium ">Create a Character</h1>
                    </div>
                @endif
            </div>

            @if (count($errors) > 0)
                <ul class="alert alert-danger">
                    @foreach ($errors->all() as $error)
                        <li>
                            {{ $error }}
                        </li>
                    @endforeach
                </ul>
            @endif
            <form class="form-horizontal" role="form" method="POST" action="{{ route(($character ? 'character.update' : 'character.create'), ['guildSlug' => $guild->slug]) }}">
                {{ csrf_field() }}

                <input hidden name="id" value="{{ $character ? $character->id : '' }}" />

                <div class="row">
                    <div class="col-12 pt-2 pb-1 mb-3 bg-light rounded">
                        <div class="row mb-4">
                            <div class="col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="name" class="font-weight-bold">
                                        <span class="text-muted fas fa-fw fa-user"></span>
                                        Character Name
                                    </label>
                                    <input name="name"
                                        maxlength="40"
                                        type="text"
                                        class="form-control"
                                        placeholder="eg. Gurgthock"
                                        value="{{ old('name') ? old('name') : ($character ? $character->name : '') }}" />
                                </div>
                            </div>

                            <!-- TODO: Permissions for who can see/set this -->
                            <div class="col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="member_id" class="font-weight-bold">

                                        Guild Member
                                    </label>
                                    <div class="form-group">
                                        <select name="member_id" class="form-control selectpicker" data-live-search="true">
                                            <option value="">
                                                —
                                            </option>

                                            @foreach ($guild->members as $member)
                                                <option value="{{ $member->id }}"
                                                    data-tokens="{{ $member->id }}"
                                                    {{ old('member_id') ? (old('member_id') == $member->id ? 'selected' : '') : ($character && $character->member_id == $member->id ? 'selected' : '') }}>
                                                    {{ $member->username }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="class" class="font-weight-bold">
                                        Class
                                    </label>
                                    <div class="form-group">
                                        <select name="class" class="form-control">
                                            <option value="" class="bg-tag">
                                                —
                                            </option>

                                            @foreach (App\Character::classes() as $class)
                                                <option value="{{ $class }}" class="bg-tag text-{{ strtolower($class) }}-important"
                                                    {{ old('class') ? (old('class') == $class ? 'selected' : '') : ($character && $character->class == $class ? 'selected' : '') }}>
                                                    {{ $class }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="spec" class="font-weight-bold">
                                        Spec
                                    </label>
                                    <input name="spec"
                                        maxlength="50"
                                        type="text"
                                        class="form-control"
                                        placeholder="eg. Fury Prot"
                                        value="{{ old('spec') ? old('spec') : ($character ? $character->spec : '') }}" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="race" class="font-weight-bold">
                                        Race
                                    </label>
                                    <div class="form-group">
                                        <select name="race" class="form-control">
                                            <option value="" selected>
                                                —
                                            </option>

                                            @foreach (App\Character::races() as $race)
                                                <option value="{{ $race }}"
                                                    {{ old('race') ? (old('race') == $race ? 'selected' : '') : ($character && $character->race == $race ? 'selected' : '') }}>
                                                    {{ $race }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-3 col-6">
                                <div class="form-group">
                                    <label for="level" class="font-weight-bold">
                                        Level
                                    </label>
                                    <input name="level"
                                        type="number"
                                        min="1"
                                        max="60"
                                        class="form-control"
                                        placeholder="0"
                                        value="{{ old('level') ? old('level') : ($character ? $character->level : '60') }}" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-3 pb-1 pt-2 bg-light rounded">
                    <div class="col-sm-6 col-12">
                        <div class="form-group">
                            <label for="raid_id" class="font-weight-bold">
                                <span class="text-muted fas fa-fw fa-users"></span>
                                Raid Group
                            </label>
                            <div class="form-group">
                                <select name="raid_id" class="form-control">
                                    <option value="" selected>
                                        —
                                    </option>

                                    @foreach ($guild->raids as $raid)
                                        <option value="{{ $raid->id }}"
                                            {{ old('raid_id') ? (old('raid_id') == $raid->id ? 'selected' : '') : ($character && $character->raid_id == $raid->id ? 'selected' : '') }}>
                                            {{ $raid->name }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-3 pb-1 pt-2 bg-light rounded">
                    <div class="col-12">
                        <div class="row mb-4">
                            <div class="col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="class" class="font-weight-bold">
                                        <span class="text-muted fas fa-fw fa-flower-daffodil"></span>
                                        Profession 1
                                    </label>
                                    <div class="form-group">
                                        <select name="profession_1" class="form-control">
                                            <option value="" selected>
                                                —
                                            </option>

                                            @foreach (App\Character::professions() as $profession)
                                                <option value="{{ $profession }}"
                                                    {{ old('profession_1') ? (old('profession_1') == $profession ? 'selected' : '') : ($character && $character->profession_1 == $profession ? 'selected' : '') }}>
                                                    {{ $profession }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-12">
                                <div class="form-group">
                                    <label for="class" class="font-weight-bold">
                                        Profession 2
                                    </label>
                                    <div class="form-group">
                                        <select name="profession_2" class="form-control">
                                            <option value="" selected>
                                                —
                                            </option>

                                            @foreach (App\Character::professions() as $profession)
                                                <option value="{{ $profession }}"
                                                    {{ old('profession_2') ? (old('profession_2') == $profession ? 'selected' : '') : ($character && $character->profession_2 == $profession ? 'selected' : '') }}>
                                                    {{ $profession }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-3 col-6">
                                <div class="form-group">
                                    <label for="rank" class="font-weight-bold">
                                        <span class="text-muted fas fa-fw fa-swords"></span>
                                        PvP Rank
                                    </label>
                                    <input name="rank"
                                        type="number"
                                        min="1"
                                        max="14"
                                        class="form-control"
                                        placeholder="—"
                                        value="{{ old('rank') ? old('rank') : ($character ? $character->rank : '') }}" />
                                </div>
                            </div>


                            <div class="col-sm-3 col-6">
                                <div class="form-group">
                                    <label for="rank_goal" class="font-weight-bold">
                                        PvP Rank Goal
                                    </label>
                                    <input name="rank_goal"
                                        type="number"
                                        min="1"
                                        max="14"
                                        class="form-control"
                                        placeholder="—"
                                        value="{{ old('rank_goal') ? old('rank_goal') : ($character ? $character->rank_goal : '') }}" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-3 pb-1 pt-2 bg-light rounded">
                    <div class="col-12">
                        <div class="form-group">
                            <label for="public_note" class="font-weight-bold">
                                <span class="text-muted fas fa-fw fa-comment-alt-lines"></span>
                                Public Note
                                <small class="text-muted">anyone in the guild can see this</small>
                            </label>
                            <textarea data-max-length="144" name="public_note" rows="2" placeholder="anyone in the guild can see this" class="form-control">{{ old('public_note') ? old('public_note') : ($character ? $character->public_note : '') }}</textarea>
                        </div>
                    </div>

                    <!-- TODO: Permissions for who can see/set this -->
                    <div class="col-12 mt-4">
                        <div class="form-group">
                            <label for="officer_note" class="font-weight-bold">
                                <span class="text-muted fas fa-fw fa-shield"></span>
                                Officer Note
                                <small class="text-muted">only officers can see this</small>
                            </label>
                            <textarea data-max-length="144" name="officer_note" rows="2" placeholder="only officers can see this" class="form-control">{{ old('officer_note') ? old('officer_note') : ($character ? $character->officer_note : '') }}</textarea>
                        </div>
                    </div>

                    {{--
                        @if ($currentMember->id == $character->member_id)
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="personal_note" class="font-weight-bold">
                                        <span class="text-muted fas fa-fw fa-eye-slash"></span>
                                        Personal Note
                                        <small class="text-muted">only you can see this</small>
                                    </label>
                                    <textarea data-max-length="2000" name="personal_note" rows="2" placeholder="only you can see this" class="form-control">{{ old('personal_note') ? old('personal_note') : ($character ? $character->personal_note : '') }}</textarea>
                                </div>
                            </div>
                        @endif
                    --}}
                </div>

                <!-- TODO: Permissions for who can see/set this -->
                @if ($character && $currentMember->id == $character->member_id)
                    <div class="row mb-3 pt-2 pb-1 bg-light rounded">
                        <div class="col-12">
                            <div class="form-group mb-0">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="inactive_at" value="1" class="" autocomplete="off"
                                            {{ old('inactive_at') && old('inactive_at') == 1 ? 'checked' : ($character->inactive_at ? 'checked' : '') }}>
                                            Inactive <small class="text-muted">no longer visible</small>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                @endif

                <div class="form-group">
                    <button class="btn btn-success"><span class="fas fa-fw fa-save"></span> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection